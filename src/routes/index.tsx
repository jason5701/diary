import { useRoutes } from 'react-router';
import MainRoutes from './MainRoutes';

export default function ThemeRoutes() {
  return useRoutes([MainRoutes]);
}
