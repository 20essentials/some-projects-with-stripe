import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** FILES ************* */

export async function createFile({
  file,
  purpose,
  fileLinkData
}: {
  file: Stripe.FileCreateParams['file'];
  purpose: Stripe.FileCreateParams.Purpose;
  fileLinkData?: Stripe.FileCreateParams.FileLinkData;
}): Promise<Stripe.File> {
  try {
    const stripeFile = await stripe.files.create({
      file,
      purpose,
      file_link_data: fileLinkData
    });

    return stripeFile;

    /* {
      "id": "file_123",
      "object": "file",
      "filename": "evidence.png",
      "purpose": "dispute_evidence",
      "size": 8429,
      "type": "png",
      "url": "https://files.stripe.com/..."
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating file');
  }
}

export async function retrieveFile({
  fileId
}: {
  fileId: string;
}): Promise<Stripe.File> {
  try {
    const stripeFile = await stripe.files.retrieve(fileId);

    return stripeFile;

    /* {
      "id": "file_123",
      "object": "file",
      "filename": "document.pdf",
      "purpose": "identity_document",
      "size": 120394,
      "type": "pdf",
      "url": "https://files.stripe.com/..."
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving file');
  }
}

export async function listFiles({
  purpose,
  limit = 10
}: {
  purpose?: Stripe.FileListParams['purpose'];
  limit?: number;
} = {}): Promise<Stripe.ApiList<Stripe.File>> {
  try {
    const files = await stripe.files.list({
      purpose,
      limit
    });

    return files;

    /* {
      "object": "list",
      "data": [
        {
          "id": "file_123",
          "filename": "evidence.png",
          "purpose": "dispute_evidence"
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing files');
  }
}
