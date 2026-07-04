import { packages } from "@/data/content";

export default function PricingTable() {
  return (
    <section id="packages" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="mb-12">
          <p className="label-caps">Packages</p>
          <h2 className="heading-xl mt-2">Packages to Meet Your Needs</h2>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="label-caps pb-4 pr-6 text-left font-medium">No.</th>
                <th className="label-caps pb-4 pr-6 text-left font-medium">
                  Package Name
                </th>
                <th className="label-caps pb-4 pr-6 text-left font-medium">
                  Includes
                </th>
                <th className="label-caps pb-4 pr-6 text-left font-medium">Time</th>
                <th className="label-caps pb-4 text-right font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.number} className="border-b border-border">
                  <td className="py-6 pr-6 align-top text-[11px] font-medium text-muted">
                    {pkg.number}
                  </td>
                  <td className="py-6 pr-6 align-top text-[11px] font-semibold uppercase tracking-[0.08em]">
                    {pkg.name}
                  </td>
                  <td className="py-6 pr-6 align-top">
                    <ul className="space-y-1">
                      {pkg.includes.map((item) => (
                        <li
                          key={item}
                          className="text-[11px] leading-relaxed text-muted before:mr-2 before:content-['•']"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-6 pr-6 align-top text-[11px] font-medium uppercase tracking-wider text-muted">
                    {pkg.time}
                  </td>
                  <td className="py-6 text-right align-top text-[11px] font-semibold">
                    {pkg.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-0 divide-y divide-border border-t border-border lg:hidden">
          {packages.map((pkg) => (
            <div key={pkg.number} className="py-6">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                    {pkg.number}
                  </span>
                  <h3 className="mt-1 text-[12px] font-semibold uppercase tracking-[0.08em]">
                    {pkg.name}
                  </h3>
                </div>
                <span className="shrink-0 text-[12px] font-semibold">{pkg.price}</span>
              </div>
              <ul className="mb-3 space-y-1">
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    className="text-[11px] leading-relaxed text-muted before:mr-2 before:content-['•']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted">
                {pkg.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
