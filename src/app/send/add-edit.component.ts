import { DatePipe } from '@angular/common';

import { Component } from '@angular/core';

import { EnvironmentService } from 'jslib-common/abstractions/environment.service';
import { I18nService } from 'jslib-common/abstractions/i18n.service';
import { LogService } from 'jslib-common/abstractions/log.service';
import { MessagingService } from 'jslib-common/abstractions/messaging.service';
import { PlatformUtilsService } from 'jslib-common/abstractions/platformUtils.service';
import { PolicyService } from 'jslib-common/abstractions/policy.service';
import { SendService } from 'jslib-common/abstractions/send.service';
import { UserService } from 'jslib-common/abstractions/user.service';

import { AddEditComponent as BaseAddEditComponent } from 'jslib-angular/components/send/add-edit.component';

@Component({
    selector: 'app-send-add-edit',
    templateUrl: 'add-edit.component.html',
})
export class AddEditComponent extends BaseAddEditComponent {
    constructor(i18nService: I18nService, platformUtilsService: PlatformUtilsService,
        environmentService: EnvironmentService, datePipe: DatePipe,
        sendService: SendService, userService: UserService,
        messagingService: MessagingService, policyService: PolicyService,
        logService: LogService) {
        super(i18nService, platformUtilsService, environmentService,
              datePipe, sendService, userService, messagingService, policyService,
              logService);
    }

    async refresh() {
        this.password = null;
        const send = await this.loadSend();
        this.send = await send.decrypt();
        this.hasPassword = this.send.password != null && this.send.password.trim() !== '';
    }

    cancel() {
        this.onCancelled.emit(this.send);
    }

    async copyLinkToClipboard(link: string) {
        super.copyLinkToClipboard(link);
        this.platformUtilsService.showToast('success', null,
            this.i18nService.t('valueCopied', this.i18nService.t('sendLink')));
    }
}
