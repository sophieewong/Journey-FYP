<script>
  import Month from "./Month.svelte";
  import NavBar from "./NavBar.svelte";
  import Popover from "./Popover.svelte";
  import { getMonths, areDatesEquivalent } from "./lib/helpers";
  import { formatDate, internationalize } from "timeUtils";
  import { keyCodes, keyCodesArray } from "./lib/keyCodes";
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const today = new Date();

  let popover;

  export let format = "#{m}/#{d}/#{Y}";
  export let start = new Date(1987, 9, 29);
  export let end = new Date(2020, 9, 29);
  export let selected = today;
  export let dateChosen = false;
  export let trigger = null;
  export let selectableCallback = null;
  export let weekStart = 0;
  export let daysOfWeek = [
    ["Sunday", "Sun"],
    ["Monday", "Mon"],
    ["Tuesday", "Tue"],
    ["Wednesday", "Wed"],
    ["Thursday", "Thu"],
    ["Friday", "Fri"],
    ["Saturday", "Sat"]
  ];
  export let monthsOfYear = [
    ["January", "Jan"],
    ["February", "Feb"],
    ["March", "Mar"],
    ["April", "Apr"],
    ["May", "May"],
    ["June", "Jun"],
    ["July", "Jul"],
    ["August", "Aug"],
    ["September", "Sep"],
    ["October", "Oct"],
    ["November", "Nov"],
    ["December", "Dec"]
  ];

  export let style = "";

  // theming variables:
  export let buttonBackgroundColor = "#fff";
  export let buttonBorderColor = "#eee";
  export let buttonTextColor = "#333";
  export let highlightColor = "#1ba8f1";
  export let dayBackgroundColor = "none";
  export let dayTextColor = "#4a4a4a";
  export let dayHighlightedBackgroundColor = "#efefef";
  export let dayHighlightedTextColor = "#4a4a4a";

  internationalize({ daysOfWeek, monthsOfYear });
  let sortedDaysOfWeek =
    weekStart === 0
      ? daysOfWeek
      : (() => {
          let dow = daysOfWeek.slice();
          dow.push(dow.shift());
          return dow;
        })();

  let highlighted = today;
  let shouldShakeDate = false;
  let shakeHighlightTimeout;
  let month = today.getMonth();
  let year = today.getFullYear();

  let isOpen = false;
  let isClosing = false;

  today.setHours(0, 0, 0, 0);

  function assignmentHandler(formatted) {
    if (!trigger) return;
    trigger.innerHTML = formatted;
  }

  $: months = getMonths(start, end, selectableCallback, weekStart);

  let monthIndex = 0;
  $: {
    monthIndex = 0;
    for (let i = 0; i < months.length; i += 1) {
      if (months[i].month === month && months[i].year === year) {
        monthIndex = i;
      }
    }
  }
  $: visibleMonth = months[monthIndex];

  $: visibleMonthId = year + month / 100;
  $: lastVisibleDate =
    visibleMonth.weeks[visibleMonth.weeks.length - 1].days[6].date;
  $: firstVisibleDate = visibleMonth.weeks[0].days[0].date;
  $: canIncrementMonth = monthIndex < months.length - 1;
  $: canDecrementMonth = monthIndex > 0;
  $: wrapperStyle = `
    --button-background-color: ${buttonBackgroundColor};
    --button-border-color: ${buttonBorderColor};
    --button-text-color: ${buttonTextColor};
    --highlight-color: ${highlightColor};
    --day-background-color: ${dayBackgroundColor};
    --day-text-color: ${dayTextColor};
    --day-highlighted-background-color: ${dayHighlightedBackgroundColor};
    --day-highlighted-text-color: ${dayHighlightedTextColor};
    ${style}
  `;

  export let formattedSelected;
  $: {
    formattedSelected =
      typeof format === "function"
        ? format(selected)
        : formatDate(selected, format);
  }

  onMount(() => {
    month = selected.getMonth();
    year = selected.getFullYear();
  });

  function changeMonth(selectedMonth) {
    month = selectedMonth;
  }

  function incrementMonth(direction, date) {
    if (direction === 1 && !canIncrementMonth) return;
    if (direction === -1 && !canDecrementMonth) return;
    let current = new Date(year, month, 1);
    current.setMonth(current.getMonth() + direction);
    month = current.getMonth();
    year = current.getFullYear();
    highlighted = new Date(year, month, date || 1);
  }

  function getDefaultHighlighted() {
    return new Date(selected);
  }

  function incrementDayHighlighted(amount) {
    highlighted = new Date(highlighted);
    highlighted.setDate(highlighted.getDate() + amount);
    if (amount > 0 && highlighted > lastVisibleDate) {
      return incrementMonth(1, highlighted.getDate());
    }
    if (amount < 0 && highlighted < firstVisibleDate) {
      return incrementMonth(-1, highlighted.getDate());
    }
    return highlighted;
  }

  function getDay(m, date) {
    for (let i = 0; i < m.weeks.length; i += 1) {
      for (let j = 0; j < m.weeks[i].days.length; j += 1) {
        if (areDatesEquivalent(m.weeks[i].days[j].date, date)) {
          return m.weeks[i].days[j];
        }
      }
    }
    return null;
  }

  function checkIfVisibleDateIsSelectable(date) {
    const day = getDay(visibleMonth, date);
    if (!day) return false;
    return day.selectable;
  }

  function shakeDate(date) {
    clearTimeout(shakeHighlightTimeout);
    shouldShakeDate = date;
    shakeHighlightTimeout = setTimeout(() => {
      shouldShakeDate = false;
    }, 700);
  }

  function assignValueToTrigger(formatted) {
    assignmentHandler(formatted);
  }

  function registerSelection(chosen) {
    if (!checkIfVisibleDateIsSelectable(chosen)) return shakeDate(chosen);
    // eslint-disable-next-line
    close();
    selected = chosen;
    dateChosen = true;
    assignValueToTrigger(formattedSelected);
    return dispatch("dateSelected", { date: chosen });
  }

  function handleKeyPress(evt) {
    if (keyCodesArray.indexOf(evt.keyCode) === -1) return;
    evt.preventDefault();
    switch (evt.keyCode) {
      case keyCodes.left:
        incrementDayHighlighted(-1);
        break;
      case keyCodes.up:
        incrementDayHighlighted(-7);
        break;
      case keyCodes.right:
        incrementDayHighlighted(1);
        break;
      case keyCodes.down:
        incrementDayHighlighted(7);
        break;
      case keyCodes.pgup:
        incrementMonth(-1);
        break;
      case keyCodes.pgdown:
        incrementMonth(1);
        break;
      case keyCodes.escape:
        // eslint-disable-next-line
        close();
        break;
      case keyCodes.enter:
        registerSelection(highlighted);
        break;
      default:
        break;
    }
  }

  function registerClose() {
    document.removeEventListener("keydown", handleKeyPress);
    dispatch("close");
  }

  function close() {
    popover.close();
    registerClose();
  }

  function registerOpen() {
    highlighted = getDefaultHighlighted();
    month = selected.getMonth();
    year = selected.getFullYear();
    document.addEventListener("keydown", handleKeyPress);
    dispatch("open");
  }
</script>

<style type="text/scss">
  .datepicker {
    display: inline-block;
    margin: 0 auto;
    text-align: center;
    overflow: visible;
  }

  .calendar-button {
    padding: 10px 20px;
    border: 1px solid var(--button-border-color);
    display: block;
    text-align: center;
    width: 300px;
    text-decoration: none;
    cursor: pointer;
    background: var(--button-background-color);
    color: var(--button-text-color);
    border-radius: 7px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
    font-family: Josefin Sans;
    font-style: normal;
    font-weight: lighter;
    font-size: 20px;
    line-height: 22px;
  }

  @media (max-width: 600px) {
    .calendar-button {
      width: 100%;
    }
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  .calendar {
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    user-select: none;
    width: 100vw;
    padding: 10px;
    padding-top: 0;
    font-family: Josefin Sans;
  }

  @media (min-width: 480px) {
    .calendar {
      height: auto;
      width: 340px;
      max-width: 100%;
    }
  }

  .legend {
    color: #4a4a4a;
    padding: 10px 0;
    margin-bottom: 5px;
  }

  .legend span {
    width: 14.285714%;
    display: inline-block;
    text-align: center;
  }
</style>

<div
  class="datepicker"
  class:open={isOpen}
  class:closing={isClosing}
  style={wrapperStyle}>
  <Popover
    bind:this={popover}
    bind:open={isOpen}
    bind:shrink={isClosing}
    {trigger}
    on:opened={registerOpen}
    on:closed={registerClose}>
    <div slot="trigger">
      <slot>
        {#if !trigger}
          <button class="calendar-button" type="button">
            {formattedSelected}
          </button>
        {/if}
      </slot>
    </div>
    <div slot="contents">
      <div class="calendar">
        <NavBar
          {month}
          {year}
          {start}
          {end}
          {canIncrementMonth}
          {canDecrementMonth}
          {monthsOfYear}
          on:monthSelected={e => changeMonth(e.detail)}
          on:incrementMonth={e => incrementMonth(e.detail)} />
        <div class="legend">
          {#each sortedDaysOfWeek as day}
            <span>{day[1]}</span>
          {/each}
        </div>
        <Month
          {visibleMonth}
          {selected}
          {highlighted}
          {shouldShakeDate}
          {start}
          {end}
          id={visibleMonthId}
          on:dateSelected={e => registerSelection(e.detail)} />
      </div>
    </div>
  </Popover>
</div>
