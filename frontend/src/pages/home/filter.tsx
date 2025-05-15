import type { FC } from "react";
import { getPlaces } from "../../utils/service";
import { useQuery } from "@tanstack/react-query";
import type { Place } from "../../types";
import { sortOptions } from "../../utils/constant";
import { useSearchParams } from "react-router-dom";

const Filter: FC = () => {
  const [params, setParams] = useSearchParams();
  // useQuery'i 2. kez bu sayfada da çağırdık ama api'a 2 istek gitmiyor. api'a sadece 1 istek gidiyor ardından gelen cevap önbellekte saklanıyor daha sonrasında yapılan bütün isteklerde önbellekte tutulan veri kullanılıyor.
  const { isLoading, error, data } = useQuery<Place[]>({
    queryKey: ["places"],
    queryFn: () => getPlaces(),
  });

  // sadece benzersiz konum isimlerinden oluşan bir dizi oluştur
  const locations = [...new Set(data?.map((i) => i.location))];

  // url'e parametre ekler
  const handleChange = (name: string, value: string): void => {
    params.set(name, value);
    setParams(params);
  };

  return (
    <form className="flex flex-col gap-4 lg:gap-10 lg:mt-12">
      <div className="field">
        <label>Nereye</label>

        {!isLoading ? (
          <select
            className="input"
            onChange={(e) => handleChange("location", e.target.value)}
            value={params.get("location") || ""}
          >
            <option value="">Seçiniz</option>
            {locations.map((i, key) => (
              <option value={i} key={key}>
                {i}
              </option>
            ))}
          </select>
        ) : (
          <div className="h-[30px]" />
        )}
      </div>

      <div className="field">
        <label>Konaklama yeri adına göre ara</label>

        <input
          type="text"
          placeholder="örn:Seaside Villa"
          className="input"
          onChange={(e) => handleChange("title", e.target.value)}
          value={params.get("title") || ""}
        />
      </div>

      <div className="field">
        <label>Sırala</label>

        <select
          className="input"
          onChange={(e) => handleChange("order", e.target.value)}
          value={params.get("order") || ""}
        >
          {sortOptions.map((i, key) => (
            <option value={i.value} key={key}>
              {i.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="reset"
          className="bg-blue-500 p-1 px-4 text-white rounded-md w-fit"
          onClick={() => setParams({})}
        >
          Filtreleri Temizle
        </button>
      </div>
    </form>
  );
};

export default Filter;
