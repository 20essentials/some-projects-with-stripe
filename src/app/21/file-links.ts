import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** FILE LINKS ************* */

export async function createFileLink({
  fileId,
  expiresAt,
  metadata
}: {
  fileId: string;
  expiresAt?: number;
  metadata?: Record<string, string>;
}): Promise<Stripe.FileLink> {
  try {
    const fileLink = await stripe.fileLinks.create({
      file: fileId,
      expires_at: expiresAt,
      metadata
    });

    return fileLink;

    /* {
      "id": "link_123",
      "object": "file_link",
      "file": "file_123",
      "expired": false,
      "expires_at": null,
      "metadata": {},
      "url": "https://files.stripe.com/links/..."
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating file link');
  }
}

export async function retrieveFileLink({
  fileLinkId
}: {
  fileLinkId: string;
}): Promise<Stripe.FileLink> {
  try {
    const fileLink = await stripe.fileLinks.retrieve(fileLinkId);

    return fileLink;

    /* {
      "id": "link_123",
      "object": "file_link",
      "file": "file_123",
      "expired": false,
      "expires_at": null,
      "metadata": {},
      "url": "https://files.stripe.com/links/..."
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving file link');
  }
}

export async function updateFileLink({
  fileLinkId,
  expiresAt,
  metadata
}: {
  fileLinkId: string;
  expiresAt?: number | 'now';
  metadata?: Record<string, string>;
}): Promise<Stripe.FileLink> {
  try {
    const fileLink = await stripe.fileLinks.update(
      fileLinkId,
      {
        expires_at: expiresAt,
        metadata
      }
    );

    return fileLink;

    /* {
      "id": "link_123",
      "object": "file_link",
      "expired": false,
      "expires_at": 1710000000,
      "metadata": {
        "orderId": "123"
      },
      "url": "https://files.stripe.com/links/..."
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating file link');
  }
}

export async function listFileLinks({
  fileId,
  limit = 10
}: {
  fileId?: string;
  limit?: number;
} = {}): Promise<Stripe.ApiList<Stripe.FileLink>> {
  try {
    const fileLinks = await stripe.fileLinks.list({
      file: fileId,
      limit
    });

    return fileLinks;

    /* {
      "object": "list",
      "data": [
        {
          "id": "link_123",
          "file": "file_123",
          "expired": false
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing file links');
  }
}