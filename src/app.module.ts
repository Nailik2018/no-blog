import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './blog/blog.schema';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
//https://medium.com/globant/crud-application-using-nestjs-and-mongodb-99a0756adb76

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://blog:blog@localhost:27017',{dbName: 'blogdb'}),
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [AppService, BlogService],
})
export class AppModule {}
