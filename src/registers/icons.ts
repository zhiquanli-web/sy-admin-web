import { App } from 'vue';
import {
  Avatar,
  CircleClose,
  HomeFilled,
  UserFilled,
  Folder,
  Setting,
  Fold,
  Expand,
  Calendar,
  Document
} from '@element-plus/icons-vue';

const components = [
  Avatar,
  CircleClose,
  HomeFilled,
  UserFilled,
  Folder,
  Setting,
  Fold,
  Expand,
  Calendar,
  Document
];

export default function (app: App): void {
  for (const icon of components) {
    app.component(icon.name, icon);
  }
}
