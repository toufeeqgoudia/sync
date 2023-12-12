import { useState, useEffect } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import {
  fetchCards,
  fetchLists,
  getMemberships,
} from "../../Utils/apiServices";
import { useAuth } from "../../Hooks/useAuth";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const classNames = (...classes: (string | boolean)[]) => {
  return classes.filter(Boolean).join(" ");
};

interface Memberships {
  id: number;
  board: number;
  user: number;
}

interface Board {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  user: number;
}

interface Lists {
  id: number;
  title: string;
  board: Board;
}

interface Cards {
  id: number;
  title: string;
  description: string;
  due_date: string;
  list: Lists;
}

const Calendar: React.FC = () => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [memberships, setMemberships] = useState<Memberships[]>([]);
  const [lists, setLists] = useState<Lists[]>([]);
  const [allCards, setAllCards] = useState<Cards[]>([]);
  const [cards, setCards] = useState<Cards[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const all_memberships = await getMemberships();
      setMemberships(all_memberships);

      const all_lists = await fetchLists();
      setLists(all_lists);

      const all_cards = await fetchCards();
      setAllCards(all_cards);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const displayCards = () => {
      const filteredMemberships = memberships.filter(
        (member) => member.user === user?.id
      );

      const filteredLists = lists.filter((list) => {
        return filteredMemberships.some((mem) => mem.board === list.board.id);
      });

      const filteredCards = allCards.filter((card) => {
        return filteredLists.some((list) => list.id === card.list.id);
      });

      setCards(filteredCards);
    };

    displayCards();
  }, [allCards, lists, memberships, user?.id]);

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const previousMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const selectedDayMeetings = cards.filter((card) =>
    isSameDay(parseISO(card.due_date), selectedDay)
  );

  const formatPostDate = (dateString: string) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    } as const;

    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
    return formattedDate.replace(",", " ");
  };

  return (
    <div className="max-w-screen h-screen pt-28 pl-80 flex flex-wrap bg-gradient-to-tr from-purple-700 from-35% via-blue-500 to-teal-300">
      <div className="w-full flex flex-col justify-center items-center">
        <h2 className="text-xl text-white font-bold text-center">Calendar</h2>

        <div className="pt-10 pb-5">
          <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
            <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
              <div className="md:pr-14">
                <div className="flex items-center">
                  <h2 className="flex-auto font-semibold text-white">
                    {format(firstDayCurrentMonth, "MMMM yyyy")}
                  </h2>
                  <button
                    type="button"
                    onClick={previousMonth}
                    className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Previous month</span>
                    <MdChevronLeft
                      sx={{ width: "24px", height: "24px" }}
                      aria-hidden="true"
                    />
                  </button>
                  <button
                    onClick={nextMonth}
                    type="button"
                    className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Next month</span>
                    <MdChevronRight
                      sx={{ width: "24px", height: "24px" }}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-slate-300">
                  <div>S</div>
                  <div>M</div>
                  <div>T</div>
                  <div>W</div>
                  <div>T</div>
                  <div>F</div>
                  <div>S</div>
                </div>
                <div className="grid grid-cols-7 mt-2 text-sm">
                  {days.map((day, dayIdx) => (
                    <div
                      key={day.toString()}
                      className={classNames(
                        dayIdx === 0 && colStartClasses[getDay(day)],
                        "py-1.5 px-1.5"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={classNames(
                          isEqual(day, selectedDay) && "text-white",
                          !isEqual(day, selectedDay) &&
                            isToday(day) &&
                            "text-red-500",
                          !isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            isSameMonth(day, firstDayCurrentMonth) &&
                            "text-white",
                          !isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            !isSameMonth(day, firstDayCurrentMonth) &&
                            "text-gray-400",
                          isEqual(day, selectedDay) &&
                            isToday(day) &&
                            "bg-red-500",
                          isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            "bg-gray-900",
                          !isEqual(day, selectedDay) &&
                            "hover:bg-gray-200 hover:text-black",
                          (isEqual(day, selectedDay) || isToday(day)) &&
                            "font-semibold",
                          "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                        )}
                      >
                        <time dateTime={format(day, "yyyy-MM-dd")}>
                          {format(day, "d")}
                        </time>
                      </button>

                      <div className="w-1 h-1 mx-auto mt-1">
                        {cards.some((card) =>
                          isSameDay(parseISO(card.due_date), day)
                        ) && (
                          <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <section className="mt-12 md:mt-0 md:pl-14">
                <h2 className="font-semibold text-white">
                  Schedule for{" "}
                  <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                    {format(selectedDay, "dd MMM yyy")}
                  </time>
                </h2>
                <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                  {selectedDayMeetings.length > 0 ? (
                    selectedDayMeetings.map((card) => (
                      <div key={card.title}>
                        <p className="text-slate-300 text-base font-semibold">
                          {card.list.board.title} - {card.list.title}
                        </p>
                        <p className="text-slate-300 text-sm">{card.title}</p>
                        <p className="text-slate-300 text-sm">
                          {card.description}
                        </p>
                        <p className="text-slate-300 text-sm">
                          {formatPostDate(card.due_date)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-300">No meetings for today.</p>
                  )}
                </ol>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default Calendar;
