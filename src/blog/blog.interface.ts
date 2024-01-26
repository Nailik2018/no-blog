import { Document } from 'mongoose';

export interface IBlog extends Document{
  readonly title: string;
  readonly description: string;
}