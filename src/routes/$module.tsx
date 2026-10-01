import { createFileRoute, notFound } from "@tanstack/react-router";
import { CrudPage } from "@/components/crud/crud-page";
import { isModuleKey } from "@/lib/netmanage/modules";

export const Route = createFileRoute("/$module")({
  beforeLoad: ({ params }) => {
    if (!isModuleKey(params.module)) throw notFound();
  },
  component: ModuleRoute,
});

function ModuleRoute() {
  const { module } = Route.useParams();
  if (!isModuleKey(module)) return null;
  return <CrudPage moduleKey={module} />;
}
