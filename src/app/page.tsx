import { Button } from "@/components/ui/button";

interface Feature {
  image: string;
  title: string;
  description: string;
}

interface Timeline3Props {
  heading: string;
  description: string;
  buttons: {
    primary: {
      text: string;
      url: string;
    };
    secondary: {
      text: string;
      url: string;
    };
  };
  features?: Feature[];
}

const Timeline = ({
  heading = "Find the cleanest vehicule corresponding to your needs",
  description = "We help you find the vehicule with the lowest carbon footprint matching your needs and your budget. We are not related to any car manufacturer.",
  buttons = {
    primary: {
      text: "Start Now",
      url: "/form", // Updated URL to redirect to the form page
    }
  },
  features = [
    {
      image: "https://shadcnblocks.com/images/block/placeholder-4.svg",
      title: "Cleanest vehicule",
      description:
        "Expanded operations to 5 new countries, reaching millions of new users.",
    },
    {
      image: "https://shadcnblocks.com/images/block/placeholder-5.svg",
      title: "Cheapest one",
      description:
        "Secured $50M in Series B funding to accelerate product development.",
    },
    {
      image: "https://shadcnblocks.com/images/block/placeholder-5.svg",
      title: "All options",
      description: "Successfully launched our flagship product to market.",
    },
  ],
}: Timeline3Props) => {
  return (
    <section className="flex items-center justify-center min-h-screen py-32">
      <div className="container max-w-6xl">
        <div className="relative grid gap-16 md:grid-cols-2">
          <div className="top-40 h-fit md:sticky">
            <h2 className="mt-4 mb-6 text-4xl font-semibold md:text-5xl">
              {heading}
            </h2>
            <p className="font-medium text-muted-foreground md:text-xl">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-4 lg:flex-row">
              <Button className="gap-2" size="lg" asChild>
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-12 md:gap-20">
            {features.map((feature, index) => (
              <div key={index} className="rounded-xl border p-2">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="aspect-video w-full rounded-xl border border-dashed object-cover"
                />
                <div className="p-6">
                  <h3 className="mb-1 text-2xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
