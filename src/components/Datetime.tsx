import { LOCALE } from "@/config";

export interface Props {
  datetime: string | Date;
  size?: "sm" | "lg";
  className?: string;
}

export default function Datetime({ datetime, size = "sm", className }: Props) {
  return (
    <div class={`flex items-center space-x-2 op-80 ${className}`}>
      <i class={`i-material-symbols-calendar-month-rounded inline-block h-6 w-6 c-base ${size === "sm" ? "scale-90" : "scale-100"}`}
      ></i>
      <span class="sr-only">Posted on:</span>
      <span class={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDatetime datetime={datetime} />
      </span>
    </div>
  );
}

const FormattedDatetime = ({ datetime }: { datetime: string | Date }) => {
  const myDatetime = new Date(datetime);

  const date = myDatetime.toLocaleDateString(LOCALE, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = myDatetime.toLocaleTimeString(LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {date}
      <span aria-hidden="true"> | </span>
      <span class="sr-only">&nbsp;at&nbsp;</span>
      {time}
    </>
  );
};
