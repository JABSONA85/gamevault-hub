import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin } from '@/context/AdminContext';
import { Game, Platform, Genre, platforms, genres } from '@/data/games';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const emptyGame: Omit<Game, 'id'> = {
  title: '',
  description: '',
  shortDescription: '',
  price: 0,
  coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
  screenshots: [],
  platform: 'PS5',
  genre: 'Action',
  releaseDate: new Date().toISOString().split('T')[0],
  publisher: '',
  developer: '',
  rating: 4.0,
  featured: false,
  bestseller: false,
  newRelease: false,
};

const AdminGames = () => {
  const { games, addGame, updateGame, deleteGame } = useAdmin();
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState<Omit<Game, 'id'>>(emptyGame);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  const openAddDialog = () => {
    setEditingGame(null);
    setFormData(emptyGame);
    setIsDialogOpen(true);
  };

  const openEditDialog = (game: Game) => {
    setEditingGame(game);
    setFormData({
      title: game.title,
      description: game.description,
      shortDescription: game.shortDescription,
      price: game.price,
      originalPrice: game.originalPrice,
      coverImage: game.coverImage,
      screenshots: game.screenshots,
      platform: game.platform,
      genre: game.genre,
      releaseDate: game.releaseDate,
      publisher: game.publisher,
      developer: game.developer,
      rating: game.rating,
      featured: game.featured,
      bestseller: game.bestseller,
      newRelease: game.newRelease,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGame) {
      updateGame(editingGame.id, formData);
      toast.success('Game updated successfully!');
    } else {
      addGame(formData);
      toast.success('Game added successfully!');
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteGame(id);
      toast.success('Game deleted successfully!');
    }
  };

  const getPlatformClass = (platform: string) => {
    if (platform.includes('PS5')) return 'bg-gradient-to-r from-blue-500 to-indigo-600';
    if (platform.includes('PS4')) return 'bg-blue-600';
    return 'bg-gradient-to-r from-green-500 to-emerald-600';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-3xl">Games</h1>
            <p className="text-muted-foreground mt-1">
              Manage your game catalog ({games.length} games)
            </p>
          </div>
          <Button
            onClick={openAddDialog}
            className="bg-gradient-to-r from-neon-cyan to-neon-magenta text-background"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Game
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-muted"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredGames.map((game) => (
                  <motion.tr
                    key={game.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-border"
                  >
                    <TableCell>
                      <img
                        src={game.coverImage}
                        alt={game.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{game.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {game.developer}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs font-bold text-white rounded ${getPlatformClass(
                          game.platform
                        )}`}
                      >
                        {game.platform}
                      </span>
                    </TableCell>
                    <TableCell>{game.genre}</TableCell>
                    <TableCell>
                      <span className="font-display font-bold text-neon-cyan">
                        ${game.price.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>⭐ {game.rating}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(game)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(game.id, game.title)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display">
                {editingGame ? 'Edit Game' : 'Add New Game'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(value) =>
                      setFormData({ ...formData, platform: value as Platform })
                    }
                  >
                    <SelectTrigger className="bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Select
                    value={formData.genre}
                    onValueChange={(value) =>
                      setFormData({ ...formData, genre: value as Genre })
                    }
                  >
                    <SelectTrigger className="bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                    }
                    required
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price ($)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={formData.originalPrice || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        originalPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                      })
                    }
                    placeholder="Leave empty if no sale"
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publisher">Publisher</Label>
                  <Input
                    id="publisher"
                    value={formData.publisher}
                    onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                    required
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="developer">Developer</Label>
                  <Input
                    id="developer"
                    value={formData.developer}
                    onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                    required
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="releaseDate">Release Date</Label>
                  <Input
                    id="releaseDate"
                    type="date"
                    value={formData.releaseDate}
                    onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                    required
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })
                    }
                    required
                    className="bg-muted"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="coverImage">Cover Image URL</Label>
                  <Input
                    id="coverImage"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    required
                    className="bg-muted"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, shortDescription: e.target.value })
                    }
                    required
                    className="bg-muted"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="bg-muted"
                  />
                </div>

                <div className="col-span-2 flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, featured: checked === true })
                      }
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="bestseller"
                      checked={formData.bestseller}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, bestseller: checked === true })
                      }
                    />
                    <Label htmlFor="bestseller">Bestseller</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="newRelease"
                      checked={formData.newRelease}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, newRelease: checked === true })
                      }
                    />
                    <Label htmlFor="newRelease">New Release</Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-neon-cyan to-neon-magenta text-background"
                >
                  {editingGame ? 'Update Game' : 'Add Game'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminGames;
