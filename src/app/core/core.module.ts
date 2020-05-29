import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AuthConfig,
  OAuthModule,
  OAuthModuleConfig,
  OAuthStorage,
} from "angular-oauth2-oidc";
import { authModuleConfig } from "./auth/auth-module-config";
import { authConfig } from "./auth/auth-config";
import { AuthService } from "./auth/auth.service";
import { HttpClientModule } from "@angular/common/http";

// We need a factory since localStorage is not available at AOT build time
export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  imports: [HttpClientModule, OAuthModule.forRoot()],
  providers: [AuthService],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: AuthConfig, useValue: authConfig },
        { provide: OAuthModuleConfig, useValue: authModuleConfig },
        { provide: OAuthStorage, useFactory: storageFactory },
      ],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "CoreModule is already loaded. Import it in the AppModule only"
      );
    }
  }
}
