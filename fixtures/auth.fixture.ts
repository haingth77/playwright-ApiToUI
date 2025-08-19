// import { test as base } from '@playwright/test';
// import { LoginPage } from '@pages/login.page';
// import path from 'path';

// // Worker-scoped authentication fixture
// export const test = base.extend({
//   // Chạy 1 lần cho mỗi worker - tạo auth state
//   workerStorageState: [
//     async ({ browser }, use) => {
//       // Setup authentication một lần cho worker
//       const context = await browser.newContext();
//       const page = await context.newPage();

//       const loginPage = new LoginPage(page);
//       await loginPage.gotoHomePage();
//       await loginPage.login('Admin', 'admin123');

//       // Save authentication state
//       const storageStatePath = path.join(__dirname, '../storage/auth.json');
//       await context.storageState({ path: storageStatePath });

//       await context.close();
//       await use(storageStatePath);
//     },
//     { scope: 'worker' },
//   ],

//   // Sử dụng auth state đã tạo
//   authenticatedContext: async ({ browser, workerStorageState }, use) => {
//     const context = await browser.newContext({
//       storageState: workerStorageState,
//     });
//     await use(context);
//     await context.close();
//   },

//   authenticatedPage: async ({ authenticatedContext }, use) => {
//     const page = await authenticatedContext.newPage();
//     await use(page);
//   },
// });

// export { expect } from '@playwright/test';
