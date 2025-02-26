interface WearsProps {
  values: {
    min_float: number | null;
    max_float: number | null;
  };
}

const wearCategories = [
  { label: "FN", range: "0.00 - 0.07", value: 0.07 },
  { label: "MW", range: "0.07 - 0.15", value: 0.16 },
  { label: "FT", range: "0.15 - 0.38", value: 0.39 },
  { label: "WW", range: "0.38 - 0.45", value: 0.46 },
  { label: "BS", range: "0.45 - 0.46", value: 0.99 },
];

export default function Wears({ values }: WearsProps) {
  const { min_float, max_float } = values;

  const calcs = (n: number, left: boolean) => {
    const [FN, MW, FT, WW, BS] = [0.07, 0.16, 0.39, 0.46, 0.99];

    const nu =
      n < FN
        ? n
        : n < MW
        ? n - FN
        : n < FT
        ? n - MW
        : n < WW
        ? n - FT
        : n === BS
        ? n - 0.45
        : n - 0.46;

    const times: number =
      n < FN ? 7 : n < MW ? 9 : n < FT ? 23 : n < WW ? 9 : 54;

    const percentage: number = Number((nu * (20 / times) * 100).toFixed(2));

    const pos: number =
      n < FN ? 0 : n < MW ? 20 : n < FT ? 40 : n < WW ? 60 : 80;

    const res: number = percentage + pos;

    return left ? res : 100 - res;
  };

  const renderCategory = (category: {
    label: string;
    range: string;
    value: number;
    isFirst: boolean;
    isLast: boolean;
  }) => {
    return (
      <div
        key={category.label}
        className={`relative group w-1/5 bg-black-400 text-center shadow-md py-2 border-black-500 border-r tippy ${
          category.isFirst ? "rounded-l-md" : ""
        } ${category.isLast ? "rounded-r-md" : ""}`}
      >
        <span className="text-sm">{category.label}</span>
        <div className="absolute opacity-0 group-hover:opacity-100 z-10 text-xs font-medium text-white rounded-md shadow-sm px-3 py-1.5 top-0 left-1/2 transform -translate-x-1/2 mt-[-40px] w-auto max-w-xs transition-opacity duration-300 tooltip bg-black-400 whitespace-nowrap">
          {category.label}: {category.range}
          <div className="tooltip-arrow absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black-400"></div>
        </div>
      </div>
    );
  };

  return (
    <>
      {(min_float !== null || max_float !== null) && (
        <div className="flex relative mt-2 mb-2 mx-4">
          {max_float !== null && (
            <div
              className="absolute top-0"
              style={{
                left: `${calcs(max_float, true)}%`,
              }}
            >
              <span
                className="text-xs absolute"
                style={{
                  marginTop: "-20px",
                  marginLeft: "-10px",
                }}
              >
                {Number(max_float || 0).toFixed(2)}
              </span>
              <svg
                className="absolute w-1.5 h-1.5"
                style={{
                  marginTop: "-5px",
                  marginLeft: "-2px",
                }}
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 7"
              >
                <path d="M11.261 2.02A.96.96 0 009.941.623L6 4.35 2.06.623A.96.96 0 00.74 2.02l4.573 4.33a1 1 0 001.374 0l4.574-4.33z"></path>
              </svg>
            </div>
          )}
          {min_float !== null && (
            <div
              className="absolute top-0"
              style={{
                left: `${calcs(min_float, true)}%`,
              }}
            >
              <span
                className="text-xs absolute"
                style={{
                  marginTop: "-20px",
                  marginLeft: "-10px",
                }}
              >
                {Number(min_float || 0).toFixed(2)}
              </span>
              <svg
                className="absolute w-1.5 h-1.5"
                style={{
                  marginTop: "-5px",
                  marginLeft: "-2px",
                }}
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 7"
              >
                <path d="M11.261 2.02A.96.96 0 009.941.623L6 4.35 2.06.623A.96.96 0 00.74 2.02l4.573 4.33a1 1 0 001.374 0l4.574-4.33z"></path>
              </svg>
            </div>
          )}
          <div className="absolute top-0 left-0 right-0 h-[3px] z-20 bg-red-500"></div>
          {min_float !== null && max_float !== null && (
            <div
              className="absolute z-20 top-0 h-[3px] bg-green-500"
              style={{
                left: `${calcs(min_float, true)}%`,
                right: `${calcs(max_float, false)}%`,
              }}
            ></div>
          )}

          {wearCategories.map((category, index) =>
            renderCategory({
              ...category,
              isFirst: index === 0,
              isLast: index === wearCategories.length - 1,
            }),
          )}
        </div>
      )}
    </>
  );
}
