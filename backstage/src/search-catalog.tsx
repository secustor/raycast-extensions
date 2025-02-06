import { BaseSearch } from "./components/base";
import { withAuth } from "./lib/auth";

function Command() {
  return <BaseSearch key="software-catalog" type="software-catalog" />;
}

export default withAuth(Command);
