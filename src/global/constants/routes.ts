const ROUTES = {
  GENERAL: {
    LOGIN: '/login',
    DISCOVER: '/discover',
    MANAGE_MENU: '/menu',
  },
  BRAND: {
    LOGIN: '/brand/login',
    REGISTER: '/brand/register',
    DISCOVER: '/brand/discover',
    CAMPAIGNS: '/brand/campaigns',
    COMPLETE_PROFILE: '/brand/complete-profile',
    FORGOT_PASSWORD: '/brand/forgot-password',
    MESSAGES: '/brand/messages',
    ORDERS: '/brand/orders',
    ORDER_DETAILS: '/brand/order',
  },
  INFLUENCER: {
    LOGIN: '/influencer/login',
    REGISTER: '/influencer/register',
    DASHBOARD: '/influencer/dashboard',
    CAMPAIGNS: '/influencer/campaigns',
    COMPLETE_PROFILE: '/influencer/complete-profile',
    FORGOT_PASSWORD: '/influencer/forgot-password',
    MESSAGES: '/influencer/messages',
    CONTENT_PACKS: '/influencer/content-packs',
    ORDERS: '/influencer/orders',
    ORDER_DETAILS: '/influencer/order',
  },
  ADMIN: {
    CAMPAIGNS: '/admin/campaigns',
  }
};

export default ROUTES;
