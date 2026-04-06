import 'server-only';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_API_SECRET;
if (!stripeSecret) throw new Error('Stripe secret key is missing 🙃');
const stripeClient = new Stripe(stripeSecret);

// CREATE ACCOUNT
const createdAccount = await stripeClient.v2.core.accounts.create({
  contact_email: 'furever@example.com',
  display_name: 'Furever',
  identity: {
    country: 'us',
    entity_type: 'company',
    business_details: {
      registered_name: 'Furever',
    },
  },
  configuration: {
    customer: {
      capabilities: {
        automatic_indirect_tax: { requested: true },
      },
    },
    merchant: {
      capabilities: {
        card_payments: { requested: true },
      },
    },
  },
  defaults: {
    responsibilities: {
      fees_collector: 'stripe',
      losses_collector: 'stripe',
    },
  },
  dashboard: 'full',
  include: [
    'configuration.merchant',
    'configuration.customer',
    'identity',
    'defaults',
  ],
});

/*
createdAccount = {
  id: 'acct_...',
  display_name: 'Furever',
  identity: { country: 'us', ... },
  configuration: { merchant: {...}, customer: {...}, ... },
  ...
}
*/


// UPDATE ACCOUNT
const updatedAccount = await stripeClient.v2.core.accounts.update(
  'acct_1Nv0FGQ9RKHgCVdK',
  {
    defaults: {
      profile: {
        business_url: 'http://accessible.stripe.com',
        doing_business_as: 'FurEver',
        product_description:
          'Saas pet grooming platform at furever.dev using Connect embedded components',
      },
    },
    identity: {
      business_details: {
        structure: 'sole_proprietorship',
        id_numbers: [
          {
            type: 'us_ein',
            value: '000000000',
          },
        ],
      },
    },
    include: ['defaults', 'identity'],
  }
);

/*
updatedAccount = {
  id: 'acct_...',
  defaults: { profile: {...}, ... },
  identity: { business_details: {...}, ... },
  ...
}
*/


// RETRIEVE ACCOUNT
const retrievedAccount = await stripeClient.v2.core.accounts.retrieve(
  'acct_1Nv0FGQ9RKHgCVdK',
  {
    include: ['defaults', 'identity', 'configuration.merchant'],
  }
);

/*
retrievedAccount = {
  id: 'acct_...',
  identity: {...},
  configuration: { merchant: {...}, ... },
  defaults: {...},
  ...
}
*/


// LIST ACCOUNTS
const accountList = await stripeClient.v2.core.accounts.list({
  limit: 2,
  applied_configurations: ['customer'],
});

/*
accountList = {
  data: [{ id: 'acct_...' }, { id: 'acct_...' }],
  has_more: false,
  ...
}
*/


// CLOSE ACCOUNT
const closedAccount = await stripeClient.v2.core.accounts.close(
  'acct_1Nv0FGQ9RKHgCVdK',
  {
    applied_configurations: ['merchant'],
  }
);

/*
closedAccount = {
  id: 'acct_...',
  status: 'closed',
  ...
}
*/