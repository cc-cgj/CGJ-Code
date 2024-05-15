import { injectable } from "inversify";
import passport from "passport";
import jsonwebtoken from "jsonwebtoken";
import { Strategy, ExtractJwt } from "passport-jwt"; // 它是passport的插件

@injectable()
export class JWT {
  private secret = "xiaojia$%~()sadasd";
  private jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: this.secret,
  };
  constructor() {
    this.strategy();
  }

  public strategy() {
    let str = new Strategy(this.jwtOptions, (payload, done) => {
      done(null, payload);
    });
    passport.use(str);
  }
  static middleware() {
    // 需要经过这个中间件
    return passport.authenticate("jwt", {
      session: false,
    });
  }
  /**
   * 生成token
   */
  public createToken(payload: object) {
    return jsonwebtoken.sign(payload, this.secret, {
      expiresIn: "7d", //token过期时间
    });
  }
  /**
   * 关联express
   */
  public init() {
    return passport.initialize();
  }
}
