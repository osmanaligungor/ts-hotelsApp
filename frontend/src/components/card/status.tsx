import type { FC } from "react";
import { CgUnavailable } from "react-icons/cg";
import { MdEventAvailable } from "react-icons/md";

interface Props {
  data: boolean;
  expand?: boolean;
}

const Status: FC<Props> = ({ data, expand }) => {
  return (
    <div
      className={`flex items-center gap-4 border border-zinc-300 p-2 rounded-md ${
        data ? "bg-green-100" : "bg-red-100"
      }`}
    >
      {data ? (
        <MdEventAvailable className="text-xl text-green-700" />
      ) : (
        <CgUnavailable className="text-xl text-red-700" />
      )}

      {expand && (
        <p className="font-bold">
          {data ? "Şuan Konaklanabilir" : "Konaklama İçin Müsait Değil"}
        </p>
      )}
    </div>
  );
};

export default Status;
