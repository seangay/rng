# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Developing

Once you've created a project and installed dependencies with `pnpm install` start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

- The game consists of a number of turns where a random number is generated between 2 values.
- Each turn the player stores the displayed number into an ordered list of X numerically ordered slots.
- The number of slots is predetermined at the beginning of the game
- The player can only set a value into a slot once per game and can't rearrange where they have previously put numbers in other turns
- The game is won if all slots can be filled by the player
- If you can't place the number into a free slot the game is over

Nice to haves

- Visually highlight "valid" slots for placement
- Drag and drop for number placement
- High scores
