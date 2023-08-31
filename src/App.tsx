import { useState } from "react";

const priceFormat = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

function getRent(
  totalRent: number,
  totalArea: number,
  commonAreaPercentage: number,
  roomArea: number,
  utilities: number
) {
  return (
    (totalRent * commonAreaPercentage) / 3 +
    (roomArea / totalArea) * totalRent +
    utilities / 3
  );
}

function App() {
  const [values, setValues] = useState({
    utilities: 200,
    rent: 0,
    area: 0,
    room1: 0,
    room2: 0,
    room3: 0,
  });

  const commonArea = values.area - (values.room1 + values.room2 + values.room3);
  const commonAreaPercentage = commonArea / values.area;

  const rentRoom1 = getRent(
    values.rent,
    values.area,
    commonAreaPercentage,
    values.room1,
    values.utilities
  );
  const rentRoom2 = getRent(
    values.rent,
    values.area,
    commonAreaPercentage,
    values.room2,
    values.utilities
  );
  const rentRoom3 = getRent(
    values.rent,
    values.area,
    commonAreaPercentage,
    values.room3,
    values.utilities
  );

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.valueAsNumber;
    setValues((values) => ({
      ...values,
      [event.target.name]: Number.isNaN(value) ? 0 : value,
    }));
  }

  return (
    <div className="max-w-lg py-12 mx-auto">
      <div className="rounded-lg shadow p-6">
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold">Mietrechner</div>
          <div className="flex flex-col gap-0.5">
            <label>Strom und Gas</label>
            <input
              name="utilities"
              className="rounded border bg-slate-50 px-3 py-2"
              type="number"
              placeholder="Strom und Gas"
              onChange={onChange}
              value={values.utilities}
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <label>Gesamtmiete</label>
            <input
              name="rent"
              className="rounded border bg-slate-50 px-3 py-2"
              type="number"
              placeholder="Gesamtmiete"
              onChange={onChange}
              value={values.rent}
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <label>Gesamtfläche</label>
            <input
              name="area"
              className="rounded border bg-slate-50 px-3 py-2"
              type="number"
              placeholder="Gesamtfläche"
              onChange={onChange}
              value={values.area}
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <label>Zimmerfläche 1</label>
            <input
              name="room1"
              className="rounded border bg-slate-50 px-3 py-2"
              type="number"
              placeholder="Zimmer 1"
              onChange={onChange}
              value={values.room1}
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <label>Zimmerfläche 2</label>
            <input
              name="room2"
              className="rounded border bg-slate-50 px-3 py-2"
              type="number"
              placeholder="Zimmer 2"
              onChange={onChange}
              value={values.room2}
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <label>Zimmerfläche 3</label>
            <input
              name="room3"
              className="rounded border bg-slate-50 px-3 py-2"
              type="number"
              placeholder="Zimmer 3"
              onChange={onChange}
              value={values.room3}
            />
          </div>

          <div className="flex flex-col">
            <p>Miete 1: {priceFormat.format(rentRoom1)}</p>
            <p>Miete 2: {priceFormat.format(rentRoom2)}</p>
            <p>Miete 3: {priceFormat.format(rentRoom3)}</p>
            <p className="font-bold border-t mt-2 pt-2">
              Gesamt mit Strom und Gas:{" "}
              {priceFormat.format(rentRoom1 + rentRoom2 + rentRoom3)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
