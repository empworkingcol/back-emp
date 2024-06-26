import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma, JobOffer as JobOfferModel } from '@prisma/client';
import { JobOfferDto } from '../dto/job.dto';
import { JobOfferService } from '../services/job.service';
import { Roles } from 'src/modules/auth/config/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/config/jwt-auth.guard';

@Controller('jobs')
export class JobOfferController {
  constructor(private readonly jobService: JobOfferService) {}

  @Get()
  async getAllJobOffers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '15',
  ) {
    return this.jobService.getAllJobs({
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':job_offer_id')
  async getJobOffer(@Param('job_offer_id') job_offer_id: string) {
    return this.jobService.getJob({ job_offer_id: job_offer_id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('SPR', 'ADM', 'COMP')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createJobOffer(
    @Body() createJobOfferDto: JobOfferDto,
  ): Promise<JobOfferModel> {
    const data: Prisma.JobOfferCreateInput = {
      offer_text: createJobOfferDto.offer_text,
      offer_title: createJobOfferDto.offer_title,
      user: { connect: { user_id: createJobOfferDto.user_id } },
      city: { connect: { city_id: createJobOfferDto.city_id } },
    };
    return this.jobService.createJob(data);
  }

  @Put(':job_offer_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateJobOffer(
    @Param('job_offer_id') job_offer_id: string,
    @Body() jobOfferData: JobOfferDto,
  ): Promise<JobOfferModel> {
    return this.jobService.updateJob({
      where: { job_offer_id: job_offer_id },
      data: jobOfferData,
    });
  }
}
