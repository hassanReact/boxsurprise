import User from "../models/User";

export const countIndirectReferrals = async (referralIds: any[]): Promise<number> => {
    let count = 0;
    for (const id of referralIds) {
      const user = await User.findById(id);
      if (user) {
        const directRefs = user.directReferrals || [];
        count += directRefs.length;
        count += await countIndirectReferrals(directRefs);
      }
    }
    return count;
  };
  