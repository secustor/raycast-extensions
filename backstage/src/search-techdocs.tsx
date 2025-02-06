import { BaseSearch } from "./components/base";
import { withAuth } from "./lib/auth";

function Command() {
  return <BaseSearch key="techdocs" type="techdocs" />;
}

export default withAuth(Command);
