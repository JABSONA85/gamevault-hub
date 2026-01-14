import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin } from '@/context/AdminContext';
import { Game } from '@/hooks/useGames';
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

const platforms = ['PS4', 'PS5', 'Xbox One', 'Xbox Series X/S'];
const genres = ['Action', 'RPG', 'Shooter', 'Sports', 'Adventure', 'Racing', 'Fighting', 'Horror', 'Simulation'];

type GameFormData = Omit<Game, 'id' | 'created_at' | 'updated_at'>;

const emptyGame: GameFormData = {
  title: '',
  description: '',
  price: 0,
  original_price: null,
  image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
  platform: 'PS5',
  genre: 'Action',
  release_date: new Date().toISOString().split('T')[0],
  publisher: '',
  developer: '',
  rating: 4.0,
  is_featured: false,
  is_new: false,
  is_on_sale: false,
  download_url: null,
};

const AdminGames = () => {
  const { games, gamesLoading, addGame, updateGame, deleteGame } = useAdmin();
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState<GameFormData>(emptyGame);

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
      price: game.price,
      original_price: game.original_price,
      image: game.image,
      platform: game.platform,
      genre: game.genre,
      release_date: game.release_date,
      publisher: game.publisher,
      developer: game.developer,
      rating: game.rating,
      is_featured: game.is_featured,
      is_new: game.is_new,
      is_on_sale: game.is_on_sale,
      download_url: game.download_url,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingGame) {
        await updateGame(editingGame.id, formData);
        toast.success('Game updated successfully!');
      } else {
        await addGame(formData);
        toast.success('Game added successfully!');
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Failed to save game');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteGame(id);
        toast.success('Game deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete game');
      }
    }
  };

  const getPlatformClass = (platform: string) => {
    if (platform.includes('PS5')) return 'bg-gradient-to-r from-blue-500 to-indigo-600';
    if (platform.includes('PS4')) return 'bg-blue-600';
    return 'bg-gradient-to-r from-green-500 to-emerald-600';
  };

  if (gamesLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

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
                        src={game.image}
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
                      setFormData({ ...formData, platform: value })
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
                      setFormData({ ...formData, genre: value })
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
                  <Label htmlFor="original_price">Original Price ($)</Label>
                  <Input
                    id="original_price"
                    type="number"
                    step="0.01"
                    value={formData.original_price || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        original_price: e.target.value ? parseFloat(e.target.value) : null,
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
                    value={formData.publisher || ''}
                    onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="developer">Developer</Label>
                  <Input
                    id="developer"
                    value={formData.developer || ''}
                    onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="release_date">Release Date</Label>
                  <Input
                    id="release_date"
                    type="date"
                    value={formData.release_date || ''}
                    onChange={(e) => setFormData({ ...formData, release_date: e.target.value })}
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
                    value={formData.rating || 0}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })
                    }
                    className="bg-muted"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="image">Cover Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                    className="bg-muted"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
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
                      id="is_featured"
                      checked={formData.is_featured || false}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, is_featured: checked === true })
                      }
                    />
                    <Label htmlFor="is_featured">Featured</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="is_on_sale"
                      checked={formData.is_on_sale || false}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, is_on_sale: checked === true })
                      }
                    />
                    <Label htmlFor="is_on_sale">On Sale</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="is_new"
                      checked={formData.is_new || false}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, is_new: checked === true })
                      }
                    />
                    <Label htmlFor="is_new">New Release</Label>
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
