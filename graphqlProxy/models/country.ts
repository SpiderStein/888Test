export class Country {
    constructor(
        public code: string,
        public name: string,
        public phone: string,
        public capital: string,
        public currency: string,
        public languages: { name: string }[]
    ) { }
}