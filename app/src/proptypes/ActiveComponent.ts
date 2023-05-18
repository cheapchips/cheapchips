export default interface ActiveComponent {
    active: boolean
    messageWhenInactive?: string // Message on top of inactive mockup, e.g. "Waiting for more players"
}