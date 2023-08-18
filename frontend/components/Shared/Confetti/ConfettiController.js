export default class ConfettiController {
    static confettiRef;

    static setConfettiRef = (ref) => {
        this.confettiRef = ref;
    };

    static startConfetti() {
        this.confettiRef?.start();
    }

    static stopConfetti() {
        this.confettiRef?.stop();
    }
}