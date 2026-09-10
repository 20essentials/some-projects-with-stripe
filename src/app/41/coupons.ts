import 'server-only';
import Stripe from 'stripe';

const secret = process.env.STRIPE_API_SECRET;
if (!secret) throw new Error('Missing Stripe secret key');

const stripe = new Stripe(secret);

/************** COUPONS ************* */

export async function createCoupon({
  percentOff,
  amountOff,
  currency,
  duration,
  durationInMonths,
  name,
  maxRedemptions,
  redeemBy,
  metadata
}: {
  percentOff?: number;
  amountOff?: number;
  currency?: string;
  duration: Stripe.CouponCreateParams.Duration;
  durationInMonths?: number;
  name?: string;
  maxRedemptions?: number;
  redeemBy?: number;
  metadata?: Record<string, string>;
}): Promise<Stripe.Coupon> {
  try {
    const coupon = await stripe.coupons.create({
      percent_off: percentOff,
      amount_off: amountOff,
      currency,
      duration,
      duration_in_months: durationInMonths,
      name,
      max_redemptions: maxRedemptions,
      redeem_by: redeemBy,
      metadata
    });

    return coupon;

    /* {
      "id": "Z4OV52SU",
      "object": "coupon",
      "amount_off": null,
      "currency": null,
      "duration": "repeating",
      "duration_in_months": 3,
      "livemode": false,
      "max_redemptions": null,
      "metadata": {},
      "name": "25% off",
      "percent_off": 25,
      "redeem_by": null,
      "times_redeemed": 0,
      "valid": true
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed creating coupon');
  }
}

export async function updateCoupon({
  couponId,
  name,
  metadata
}: {
  couponId: string;
  name?: string;
  metadata?: Record<string, string>;
}): Promise<Stripe.Coupon> {
  try {
    const coupon = await stripe.coupons.update(
      couponId,
      {
        name,
        metadata
      }
    );

    return coupon;

    /* {
      "id": "Z4OV52SU",
      "object": "coupon",
      "name": "Updated coupon",
      "metadata": {}
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed updating coupon');
  }
}

export async function retrieveCoupon({
  couponId
}: {
  couponId: string;
}): Promise<Stripe.Coupon> {
  try {
    const coupon = await stripe.coupons.retrieve(couponId);

    return coupon;

    /* {
      "id": "Z4OV52SU",
      "object": "coupon",
      "amount_off": null,
      "currency": null,
      "duration": "repeating",
      "duration_in_months": 3,
      "livemode": false,
      "name": "25% off",
      "percent_off": 25,
      "times_redeemed": 0,
      "valid": true
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed retrieving coupon');
  }
}

export async function listCoupons({
  limit = 10,
  startingAfter,
  endingBefore
}: {
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
} = {}): Promise<Stripe.ApiList<Stripe.Coupon>> {
  try {
    const coupons = await stripe.coupons.list({
      limit,
      starting_after: startingAfter,
      ending_before: endingBefore
    });

    return coupons;

    /* {
      "object": "list",
      "data": [
        {
          "id": "Z4OV52SU",
          "object": "coupon",
          "duration": "repeating",
          "duration_in_months": 3,
          "percent_off": 25,
          "valid": true
        }
      ],
      "has_more": false
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed listing coupons');
  }
}

export async function deleteCoupon({
  couponId
}: {
  couponId: string;
}): Promise<Stripe.DeletedCoupon> {
  try {
    const deleted = await stripe.coupons.del(couponId);

    return deleted;

    /* {
      "id": "Z4OV52SU",
      "object": "coupon",
      "deleted": true
    } */
  } catch (error) {
    console.error('Stripe error', error);
    throw new Error('Failed deleting coupon');
  }
}