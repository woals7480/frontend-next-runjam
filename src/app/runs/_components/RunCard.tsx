import Image from "next/image";
import * as s from "./RunCard.css";
import dayjs from "dayjs";
import { Run } from "@/model/Run";

type Props = {
  run: Run;
};

export default function RunCrad({ run }: Props) {
  return (
    <article className={s.card}>
      <div className={s.inner}>
        <div className={s.headRow}>
          <div className={s.thumb}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M13.5 5.5c1.09 0 2-.92 2-2a2 2 0 0 0-2-2c-1.11 0-2 .88-2 2c0 1.08.89 2 2 2M9.89 19.38l1-4.38L13 17v6h2v-7.5l-2.11-2l.61-3A7.3 7.3 0 0 0 19 13v-2c-1.91 0-3.5-1-4.31-2.42l-1-1.58c-.4-.62-1-1-1.69-1c-.31 0-.5.08-.81.08L6 8.28V13h2V9.58l1.79-.7L8.19 17l-4.9-1l-.4 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className={s.title}>{run.note}</h3>
            <p className={s.subtitle}>
              {dayjs(run.runAt).format("YYYY-MM-DD hh:mm")}
            </p>
          </div>
        </div>

        <div className={s.metrics}>
          <div className={s.metric}>
            <div className={s.value}>{run.distance}</div>
            <div className={s.label}>Km</div>
          </div>
          <div className={s.metric}>
            <div className={s.value}>{run.pacePerKm}</div>
            <div className={s.label}>평균 페이스</div>
          </div>
          <div className={s.metric}>
            <div className={s.value}>{run.durationText}</div>
            <div className={s.label}>시간</div>
          </div>
        </div>
      </div>
    </article>
  );
}
