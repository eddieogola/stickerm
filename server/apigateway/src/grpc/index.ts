import { loadPackageDefinition } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { join } from "path";

const PROTO_PATH = join(__dirname, "../../../protos/stickerm.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = loadPackageDefinition(packageDefinition);

const stickermProto = protoDescriptor.stickerm;

export { stickermProto };
