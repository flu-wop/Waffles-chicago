import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center px-6 pt-28 text-center">
      <div>
        <p className="font-serif text-7xl italic text-orange md:text-9xl">404</p>
        <h1 className="mt-4 text-3xl font-semibold md:text-5xl">This one&apos;s off the menu.</h1>
        <p className="mx-auto mt-4 max-w-sm text-brown-light">The page you wanted isn&apos;t here, but the waffles are.</p>
        <ButtonLink href="/menu" className="mt-8">See the menu</ButtonLink>
      </div>
    </section>
  );
}
