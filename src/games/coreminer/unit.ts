// This is a class to represent the Unit object in the game.
// If you want to render it in the game do so here.
import { Immutable } from "src/utils";
import { Viseur } from "src/viseur";
import { makeRenderable } from "src/viseur/game";
import { GameObject } from "./game-object";
import { CoreminerDelta, ITileState, IUnitState } from "./state-interfaces";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be added here safely between Creer runs
// <<-- /Creer-Merge: imports -->>

// <<-- Creer-Merge: should-render -->>
// Set this variable to `true`, if this class should render.
const SHOULD_RENDER = undefined;
// <<-- /Creer-Merge: should-render -->>

/**
 * An object in the game. The most basic class that all game classes should inherit from automatically.
 */
export class Unit extends makeRenderable(GameObject, SHOULD_RENDER) {
    // <<-- Creer-Merge: static-functions -->>
    // you can add static functions here
    // <<-- /Creer-Merge: static-functions -->>

    /** The current state of the Unit (dt = 0) */
    public current: IUnitState | undefined;

    /** The next state of the Unit (dt = 1) */
    public next: IUnitState | undefined;

    // <<-- Creer-Merge: variables -->>
    // You can add additional member variables here
    // <<-- /Creer-Merge: variables -->>

    /**
     * Constructor for the Unit with basic logic as provided by the Creer
     * code generator. This is a good place to initialize sprites and constants.
     *
     * @param state - The initial state of this Unit.
     * @param viseur - The Viseur instance that controls everything and contains the game.
     */
    constructor(state: IUnitState, viseur: Viseur) {
        super(state, viseur);

        // <<-- Creer-Merge: constructor -->>
        // You can initialize your new Unit here.
        // <<-- /Creer-Merge: constructor -->>
    }

    /**
     * Called approx 60 times a second to update and render Unit instances.
     * Leave empty if it is not being rendered.
     *
     * @param dt - A floating point number [0, 1) which represents how far into
     * the next turn that current turn we are rendering is at
     * @param current - The current (most) game state, will be this.next if this.current is undefined.
     * @param next - The next (most) game state, will be this.current if this.next is undefined.
     * @param delta - The current (most) delta, which explains what happened.
     * @param nextDelta  - The the next (most) delta, which explains what happend.
     */
    public render(
        dt: number,
        current: Immutable<IUnitState>,
        next: Immutable<IUnitState>,
        delta: Immutable<CoreminerDelta>,
        nextDelta: Immutable<CoreminerDelta>,
    ): void {
        super.render(dt, current, next, delta, nextDelta);

        // <<-- Creer-Merge: render -->>
        // render where the Unit is
        // <<-- /Creer-Merge: render -->>
    }

    /**
     * Invoked after a player changes their color,
     * so we have a chance to recolor this Unit's sprites.
     */
    public recolor(): void {
        super.recolor();

        // <<-- Creer-Merge: recolor -->>
        // replace with code to recolor sprites based on player color
        // <<-- /Creer-Merge: recolor -->>
    }

    /**
     * Invoked when this Unit instance should not be rendered,
     * such as going back in time before it existed.
     *
     * By default the super hides container.
     * If this sub class adds extra PIXI objects outside this.container, you should hide those too in here.
     */
    public hideRender(): void {
        super.hideRender();

        // <<-- Creer-Merge: hide-render -->>
        // hide anything outside of `this.container`.
        // <<-- /Creer-Merge: hide-render -->>
    }

    /**
     * Invoked when the state updates.
     *
     * @param current - The current (most) game state, will be this.next if this.current is undefined.
     * @param next - The next (most) game state, will be this.current if this.next is undefined.
     * @param delta - The current (most) delta, which explains what happened.
     * @param nextDelta  - The the next (most) delta, which explains what happend.
     */
    public stateUpdated(
        current: Immutable<IUnitState>,
        next: Immutable<IUnitState>,
        delta: Immutable<CoreminerDelta>,
        nextDelta: Immutable<CoreminerDelta>,
    ): void {
        super.stateUpdated(current, next, delta, nextDelta);

        // <<-- Creer-Merge: state-updated -->>
        // update the Unit based off its states
        // <<-- /Creer-Merge: state-updated -->>
    }

    // <<-- Creer-Merge: public-functions -->>
    // You can add additional public functions here
    // <<-- /Creer-Merge: public-functions -->>

    // <Joueur functions> --- functions invoked for human playable client
    // NOTE: These functions are only used 99% of the time if the game supports human playable clients (like Chess).
    //       If it does not, feel free to ignore these Joueur functions.

    /**
     * Builds a support, shield, or ladder on Unit's tile, or an adjacent Tile.
     * @param tile The Tile to build on.
     * @param type The structure to build (support, ladder, or shield).
     * @param callback? The callback that eventually returns the return value
     * from the server. - The returned value is True if successfully built,
     * False otherwise.
     */
    public build(
        tile: ITileState,
        type: "support" | "ladder" | "shield",
        callback?: (returned: boolean) => void,
    ): void {
        this.runOnServer("build", {tile, type}, callback);
    }

    /**
     * Purchase a resource from the player's base or hopper.
     * @param resource The type of resource to buy.
     * @param amount The amount of resource to buy.
     * @param callback? The callback that eventually returns the return value
     * from the server. - The returned value is True if successfully purchased,
     * false otherwise.
     */
    public buy(
        resource: "dirt" | "ore" | "bomb" | "buildingMaterials",
        amount: number,
        callback?: (returned: boolean) => void,
    ): void {
        this.runOnServer("buy", {resource, amount}, callback);
    }

    /**
     * Dumps materials from cargo to an adjacent tile. If the tile is a base or
     * hopper tile, materials are sold instead of placed.
     * @param tile The tile the materials will be dumped on.
     * @param material The material the Unit will drop. 'dirt', 'ore', or
     * 'bomb'.
     * @param amount The number of materials to drop. Amounts <= 0 will drop all
     * the materials.
     * @param callback? The callback that eventually returns the return value
     * from the server. - The returned value is True if successfully dumped
     * materials, false otherwise.
     */
    public dump(
        tile: ITileState,
        material: "dirt" | "ore" | "bomb",
        amount: number,
        callback?: (returned: boolean) => void,
    ): void {
        this.runOnServer("dump", {tile, material, amount}, callback);
    }

    /**
     * Mines the Tile the Unit is on or an adjacent tile.
     * @param tile The Tile the materials will be mined from.
     * @param amount The amount of material to mine up. Amounts <= 0 will mine
     * all the materials that the Unit can.
     * @param callback? The callback that eventually returns the return value
     * from the server. - The returned value is True if successfully mined,
     * false otherwise.
     */
    public mine(
        tile: ITileState,
        amount: number,
        callback?: (returned: boolean) => void,
    ): void {
        this.runOnServer("mine", {tile, amount}, callback);
    }

    /**
     * Moves this Unit from its current Tile to an adjacent Tile.
     * @param tile The Tile this Unit should move to.
     * @param callback? The callback that eventually returns the return value
     * from the server. - The returned value is True if it moved, false
     * otherwise.
     */
    public move(
        tile: ITileState,
        callback?: (returned: boolean) => void,
    ): void {
        this.runOnServer("move", {tile}, callback);
    }

    /**
     * Transfers a resource from the one Unit to another.
     * @param unit The Unit to transfer materials to.
     * @param resource The type of resource to transfer.
     * @param amount The amount of resource to transfer.
     * @param callback? The callback that eventually returns the return value
     * from the server. - The returned value is True if successfully transfered,
     * false otherwise.
     */
    public transfer(
        unit: IUnitState,
        resource: "dirt" | "ore" | "bomb" | "buildingMaterials",
        amount: number,
        callback?: (returned: boolean) => void,
    ): void {
        this.runOnServer("transfer", {unit, resource, amount}, callback);
    }

    /**
     * Upgrade this Unit.
     * @param callback? The callback that eventually returns the return value
     * from the server. - The returned value is True if successfully upgraded,
     * False otherwise.
     */
    public upgrade(
        callback?: (returned: boolean) => void,
    ): void {
        this.runOnServer("upgrade", {}, callback);
    }

    // </Joueur functions>

    // <<-- Creer-Merge: protected-private-functions -->>
    // You can add additional protected/private functions here
    // <<-- /Creer-Merge: protected-private-functions -->>
}
