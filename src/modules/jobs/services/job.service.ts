import { Injectable, Logger } from '@nestjs/common';
import { Prisma, JobOffer } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { ResJobOfferDto } from '../dto/res-job.sto';

@Injectable()
export class JobOfferService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('Job service');

  async getJob(
    jobWhereUniqueInput: Prisma.JobOfferWhereUniqueInput,
  ): Promise<ResJobOfferDto | null> {
    this.logger.log('jobById');
    const jobData = await this.prisma.jobOffer.findUnique({
      where: jobWhereUniqueInput,
      select: {
        job_offer_id: true,
        user: {
          select: {
            user_name: true,
          },
        },
        city: {
          select: {
            city_name: true,
            country: {
              select: {
                country_name: true,
              },
            },
          },
        },
        offer_title: true,
        creation_date: true,
        offer_text: true,
      },
    });
    return jobData;
  }

  async getAllJobs({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    this.logger.log('getAllJobs');
    const data = await this.prisma.jobOffer.findMany({
      skip: skip,
      take: limit,
      select: {
        job_offer_id: true,
        user: {
          select: {
            user_name: true,
          },
        },
        city: {
          select: {
            city_name: true,
            country: {
              select: {
                country_name: true,
              },
            },
          },
        },
        offer_title: true,
        offer_text: true,
        creation_date: true,
      },
    });
    const total = await this.prisma.jobOffer.count();
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      totalPages,
      currentPage: page,
    };
  }

  async createJob(data: Prisma.JobOfferCreateInput): Promise<JobOffer> {
    this.logger.log('createJob');
    const createJob = await this.prisma.jobOffer.create({
      data,
    });

    return createJob;
  }

  async updateJob(params: {
    where: Prisma.JobOfferWhereUniqueInput;
    data: Prisma.JobOfferUpdateInput;
  }): Promise<JobOffer> {
    this.logger.log('updateJob');
    const updateJob = await this.prisma.jobOffer.update({
      where: params.where,
      data: params.data,
    });
    return updateJob;
  }
}
