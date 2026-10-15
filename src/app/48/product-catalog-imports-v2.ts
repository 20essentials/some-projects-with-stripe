import 'server-only';

const secret =
  process.env.STRIPE_API_SECRET;

if (!secret)
  throw new Error(
    'Missing Stripe secret key'
  );

const baseUrl =
  'https://api.stripe.com/v2/commerce/product_catalog/imports';

const headers = {
  Authorization: `Bearer ${secret}`,
  'Content-Type': 'application/json',
  'Stripe-Version': '2026-09-30.endive'
};

type ProductCatalogFeedType =
  | 'inventory'
  | 'pricing'
  | 'product'
  | 'promotion';

type ProductCatalogImportMode =
  | 'replace'
  | 'upsert';

type ProductCatalogImportStatus =
  | 'awaiting_upload'
  | 'failed'
  | 'processing'
  | 'succeeded'
  | 'succeeded_with_errors';

type ProductCatalogImport = {
  id: string;
  object: 'v2.commerce.product_catalog_import';
  status: ProductCatalogImportStatus;
  created: string;
  status_details?: {
    awaiting_upload?: {
      upload_url: {
        url: string;
        expires_at: string;
      };
    };
    succeeded?: {
      success_count: number;
    };
  };
  metadata: Record<string, string>;
};

type ProductCatalogImportList = {
  object: 'v2.list';
  data: ProductCatalogImport[];
  next_page_url: string | null;
  previous_page_url: string | null;
};

async function stripeRequest<T>(
  path: string,
  method: 'GET' | 'POST',
  body?: object
): Promise<T> {
  try {
    const response = await fetch(
      `${baseUrl}${path}`,
      {
        method,
        headers,
        body: body
          ? JSON.stringify(body)
          : undefined
      }
    );

    if (!response.ok) {
      throw new Error(
        `Stripe API request failed: ${response.status}`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(
      'Stripe error',
      error
    );
    throw new Error(
      'Failed to process product catalog import request'
    );
  }
}

/************** CREATE PRODUCT CATALOG IMPORT **************/

export async function createProductCatalogImport({
  feedType,
  mode,
  metadata
}: {
  feedType: ProductCatalogFeedType;
  mode: ProductCatalogImportMode;
  metadata: Record<string, string>;
}): Promise<ProductCatalogImport> {
  return stripeRequest<ProductCatalogImport>(
    '',
    'POST',
    {
      feed_type: feedType,
      mode,
      metadata
    }
  );

  /*
  {
    "id": "pcimprt_test_123",
    "object": "v2.commerce.product_catalog_import",
    "status": "awaiting_upload",
    "created": "2026-01-01T00:00:00.000Z",
    "status_details": {
      "awaiting_upload": {
        "upload_url": {
          "url": "https://stripeusercontent.com/files/example",
          "expires_at": "2026-01-01T01:00:00.000Z"
        }
      }
    },
    "metadata": {
      "file_name": "products.csv"
    }
  }
  */
}

/************** RETRIEVE PRODUCT CATALOG IMPORT **************/

export async function retrieveProductCatalogImport(
  importId: string
): Promise<ProductCatalogImport> {
  return stripeRequest<ProductCatalogImport>(
    `/${encodeURIComponent(importId)}`,
    'GET'
  );

  /*
  {
    "id": "pcimprt_test_123",
    "object": "v2.commerce.product_catalog_import",
    "status": "succeeded",
    "created": "2026-01-01T00:00:00.000Z",
    "status_details": {
      "succeeded": {
        "success_count": 150
      }
    },
    "metadata": {
      "file_name": "products.csv"
    }
  }
  */
}

/************** LIST PRODUCT CATALOG IMPORTS **************/

export async function listProductCatalogImports({
  created,
  createdGt,
  createdGte,
  createdLt,
  createdLte,
  feedType,
  limit,
  page,
  status
}: {
  created?: string;
  createdGt?: string;
  createdGte?: string;
  createdLt?: string;
  createdLte?: string;
  feedType?: ProductCatalogFeedType;
  limit?: number;
  page?: string;
  status?: ProductCatalogImportStatus;
} = {}): Promise<ProductCatalogImportList> {
  const params = new URLSearchParams();

  if (created !== undefined)
    params.set('created', created);
  if (createdGt !== undefined)
    params.set('created_gt', createdGt);
  if (createdGte !== undefined)
    params.set(
      'created_gte',
      createdGte
    );
  if (createdLt !== undefined)
    params.set('created_lt', createdLt);
  if (createdLte !== undefined)
    params.set(
      'created_lte',
      createdLte
    );
  if (feedType !== undefined)
    params.set('feed_type', feedType);
  if (limit !== undefined)
    params.set('limit', String(limit));
  if (page !== undefined)
    params.set('page', page);
  if (status !== undefined)
    params.set('status', status);

  const query = params.toString();
  const path = query ? `?${query}` : '';

  return stripeRequest<ProductCatalogImportList>(
    path,
    'GET'
  );

  /*
  {
    "object": "v2.list",
    "data": [],
    "next_page_url": null,
    "previous_page_url": null
  }
  */
}
