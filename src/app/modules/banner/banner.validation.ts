import { z } from 'zod';

const create = z.object({
  body: z.object({
    colony_name: z.string({ required_error: 'Colony Name is Required!' }),
    ward_no: z.string({ required_error: 'Ward Number is Required!' }),
  }),
});

const update = z.object({
  body: z.object({
    colony_name: z.string().optional(),
    ward_no: z.string().optional(),
  }),
});

export const ColonyValidation = {
  create,
  update,
};
