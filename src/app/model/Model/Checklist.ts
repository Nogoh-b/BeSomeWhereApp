import { FolderStats } from './Folder_Checklist';
import { RouteChecklist } from './Route_Checklist';
import { Transport_Checklist } from './Transport_Checklist';
import { User } from './Utilisateur';

/**
 *
 */
 export class Checklist {
  id: number;
  title: string;
  with_baby: boolean;
  user_id: number;
  user: User;
  created_at: string;
  updated_at: string;
  stats: FolderStats;
  transports: Transport_Checklist[];
  routes: RouteChecklist []


}



