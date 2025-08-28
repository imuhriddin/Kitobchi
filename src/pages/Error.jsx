import { Link, useRouteError } from "react-router"

function Error() {
    const error = useRouteError();

    if(error.status === 404) {
        return (
            <div className="mx-auto max-w-[1220px] px-5">
                <h1>sahifa topilmadi</h1>
                <Link to={'/'}>Go to Home</Link>
            </div>
        )
    }
    return (
        <div className="mx-auto max-w-[1220px] px-5">
            <h1>Nimadur xato ketti</h1>
        </div>
    )
}

export default Error