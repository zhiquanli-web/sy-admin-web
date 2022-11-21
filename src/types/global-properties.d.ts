import { Component } from 'vue';
import { IFilters } from '@/registers/properties';

declare module 'vue' {
  export interface ComponentCustomProperties extends Component {
    $filters: IFilters;
  }
}
