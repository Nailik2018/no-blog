import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  async findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') blogId: string) {
    try {
      const existingBlog = await
        this.blogService.findOne(blogId);
      return response.status(HttpStatus.OK).json({
        blog: existingBlog});
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put(':id')
  async update(@Res() response,@Param('id') blogId: string, @Body() updateBlogDto: UpdateBlogDto) {
    try {
      const existingBlog = await this.blogService.update(blogId, updateBlogDto);
      return response.status(HttpStatus.OK).json({ existingBlog,});
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') blogId: string)
  {
    try {
      await this.blogService.remove(blogId);
      return response.status(HttpStatus.OK).json({
        message: 'Blog deleted successfully'});
    }catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
