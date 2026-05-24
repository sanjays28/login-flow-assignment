import { startupService } from '@/services';

export class VApplication {
  private static instance: VApplication;

  static getInstance() {
    if (!VApplication.instance) {
      VApplication.instance = new VApplication();
    }
    return VApplication.instance;
  }

  async bootstrap() {
    await startupService.validateStartup();
  }
}
