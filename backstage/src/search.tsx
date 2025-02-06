import { BaseSearch } from "./components/base";
import { withAuth } from "./lib/auth";

function Command() {
  return <BaseSearch key="all" type="all" />;
}

export default withAuth(Command);
