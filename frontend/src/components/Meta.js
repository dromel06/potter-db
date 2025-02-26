import Head from "next/head";
import { useRouter } from "next/router";

const Meta = ({ title, description, image }) => {
  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const url = `${origin}${asPath}`;
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{`Potter DB - ${title}`}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
};

Meta.defaultProps = {
  title: "Home",
  description:
    "Harry Potter Database for information about characters, books, movies, spells, potions and much more! - Data based on the Harry Potter Wiki",
  image: "/images/logo",
};

export default Meta;
