import {ChangeDetectorRef, NgZone, OnDestroy, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoPipe implements PipeTransform, OnDestroy{

    private timer: number;
    constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}

    transform(value: string) {
        if (!value) {
            return '00:00:00';
        }
        this.removeTimer();
        const d: Date = new Date(value);
        const now: Date = new Date();
        this.timer = this.ngZone.runOutsideAngular(() => {
            if (typeof window !== 'undefined') {
                return window.setTimeout(() => {
                    this.ngZone.run(() => this.changeDetectorRef.markForCheck());
                }, 1000);
            }
            return null;
        });
        const seconds: number = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));

        const hoursToDisplay: number = Math.floor(seconds / 3600);
        const minutesToDisplay: number = Math.floor((seconds - hoursToDisplay * 3600) / 60 );
        const secondsToDisplay: number = seconds - (minutesToDisplay * 60 + hoursToDisplay * 3600);

        const hoursString: string = hoursToDisplay <= 9 ? '0' + hoursToDisplay.toString() : hoursToDisplay.toString();
        const minutesString: string  = minutesToDisplay <= 9 ? '0' + minutesToDisplay.toString() : minutesToDisplay.toString();
        const secondsString: string  = secondsToDisplay <= 9 ? '0' + secondsToDisplay.toString() : secondsToDisplay.toString();
        return hoursString + ':' + minutesString + ':' + secondsString;
    }
    ngOnDestroy(): void {
        this.removeTimer();
    }
    private removeTimer() {
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }
    }

}
