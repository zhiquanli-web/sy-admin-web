export interface IDialog {
  show: boolean;
  type: 'create' | 'edit';
  row: object;
}
