import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Model } from 'mongoose';
import { IBlog } from './blog.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlogService {

  constructor(@InjectModel("Blog") private blogModel: Model<IBlog>) {
  }

  async create(createBlogDto: CreateBlogDto): Promise<IBlog> {
    const newBlog = await new this.blogModel(createBlogDto);
    return newBlog.save();
  }

  async findAll(): Promise<IBlog[]> {
    const blogData = await this.blogModel.find();
    if (!blogData || blogData.length == 0) {
      throw new NotFoundException("Blog data not found!");
    }
    return blogData;
  }

  // async findOne(id: number) {
  //   return `This action returns a #${id} blog`;
  // }

  async findOne(blogId: string): Promise<IBlog> {
    const existingBlog = await     this.blogModel.findById(blogId).exec();
    if (!existingBlog) {
      throw new NotFoundException(`Student #${blogId} not found`);
    }
    return existingBlog;
  }


  async update(blogId: string, updateBlogDto: UpdateBlogDto): Promise<IBlog> {
    const existingBlog = await this.blogModel.findByIdAndUpdate(blogId, updateBlogDto, { new: true });
    if (!existingBlog) {
      throw new NotFoundException(`Blog #${blogId} not found`);
    }
    return existingBlog;
  }

  async remove(id: string): Promise<IBlog> {
    const deletedBlog = await this.blogModel.findByIdAndDelete(id);
    if (!deletedBlog) {
      throw new NotFoundException(`Blog #${id} not found`);
    }
    return deletedBlog;
  }
}
