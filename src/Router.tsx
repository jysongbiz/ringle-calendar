import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { Route, Switch, useLocation } from 'wouter'
import { useEffect } from 'react'
import { DATE_FORMATS, DEFAULT_VIEW, VIEWS, type ViewType } from '@/constants'
import { updateFromURL } from '@/store/calendarSlice'
import { MonthView, WeekView } from '@/views'

const routeFormat = '/:year/:month/:day'

const isValidDate = (year: string, month: string, day: string): boolean => {
	const [yearNum, monthNum, dayNum] = [year, month, day].map(Number)
	const isYearValid = yearNum >= 0 && yearNum <= 9999
	const isMonthValid = monthNum >= 1 && monthNum <= 12
	const lastDayOfMonth = dayjs(`${year}-${month}-01`).daysInMonth()
	const isDayValid = dayNum >= 1 && dayNum <= lastDayOfMonth

	return isYearValid && isMonthValid && isDayValid
}

const Redirect = () => {
	const [, setLocation] = useLocation()

	useEffect(() => {
		const now = dayjs()
		setLocation(
			`/${DEFAULT_VIEW}/${now.format(DATE_FORMATS.YEAR)}/${now.format(DATE_FORMATS.MONTH)}/${now.format(DATE_FORMATS.DAY_NUMBER)}`
		)
	}, [setLocation])

	return null
}

const FallbackRedirect = () => {
	const [, setLocation] = useLocation()

	useEffect(() => {
		setLocation('/')
	}, [setLocation])

	return null
}

const ViewWrapper = ({
	year,
	month,
	day,
	view,
}: {
	year: string
	month: string
	day: string
	view: ViewType
}) => {
	const dispatch = useDispatch()
	const [, setLocation] = useLocation()

	useEffect(() => {
		if (!isValidDate(year, month, day)) {
			setLocation('/')
			return
		}

		dispatch(updateFromURL({ year, month, day, view }))
	}, [year, month, day, view, dispatch, setLocation])

	return view === 'week' ? <WeekView /> : <MonthView />
}

const Router = () => {
	return (
		<Switch>
			<Route path="/" component={Redirect} />
			{VIEWS.map((view) => (
				<Route key={view} path={`/${view}${routeFormat}`}>
					{(params) => <ViewWrapper {...params} view={view} />}
				</Route>
			))}
			<Route component={FallbackRedirect} />
		</Switch>
	)
}

export default Router
