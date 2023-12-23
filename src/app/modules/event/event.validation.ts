import { z } from 'zod'

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
    banner: z.string({
      required_error: 'banner is required',
    }),
    image: z.string({
      required_error: 'image is required',
    }),

    event_time: z.string({
      required_error: 'Event Time is required',
    }),
    event_date: z.string({
      required_error: 'Event Date is required',
    }),
    location: z.string({
      required_error: 'Location is required',
    }),
  }),
})

const update = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }).optional(),
    description: z.string({
      required_error: 'description is required',
    }).optional(),
    banner: z.string({
      required_error: 'Banner Image is required',
    }).optional(),
    image: z.string({
      required_error: 'Image is required',
    }).optional(),

    event_time: z.string({
      required_error: 'Event Time is required',
    }).optional(),
    event_date: z.string({
      required_error: 'Event Date is required',
    }).optional(),
    location: z.string({
      required_error: 'Location is required',
    }).optional(),
  }),
})

export const EventValidation = {
  create,
  update,
}
