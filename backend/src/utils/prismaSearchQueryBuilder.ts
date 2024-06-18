type QueryParams = {
  [key: string]: string;
};

type PrismaQuery = {
  where: {
    AND: {
      [key: string]: {
        contains: string;
        mode: string;
      };
    }[];
  };
};

export default (queryParams: QueryParams): PrismaQuery => {
  const query = queryParams || {};
  if (Object.keys(query).length === 0) return { where: { AND: [] } };
  const prismaQuery: PrismaQuery = {
    where: {
      AND: [],
    },
  };
  Object.keys(query).map((key) =>
    prismaQuery.where.AND.push({
      [key]: {
        contains: query[key],
        mode: 'insensitive',
      },
    }),
  );
  return prismaQuery;
};
