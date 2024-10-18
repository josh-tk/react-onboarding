import {errors, links} from "../lang";
import {FormattedText} from "@travelperksl/suitcase";
import {Link} from "react-router-dom";

const resourceNotFound = () => (
    <div>
        <h1><FormattedText size={'displayXL'}>404</FormattedText></h1>
        <p><FormattedText size={'displayM'}>{errors.notFound.defaultMessage}</FormattedText></p>
        <i>:( sadness</i>

        <Link to="/recipes">
            <FormattedText>{links.backToList.defaultMessage}</FormattedText>
        </Link>
    </div>
);

export default resourceNotFound;
